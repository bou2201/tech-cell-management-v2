'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@/components/ui';
import {
  ChangeEventHandler,
  ReactNode,
  TextareaHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

/**
 * TextareaInputProps defines the props for the TextareaInput component.
 *
 * @template T - Type extending FieldValues for the control.
 * @property {FieldPath<T>} name - The name/path of the field in the form.
 * @property {string} label - The label for the textarea input field.
 * @property {string | ReactNode} [description] - Optional description or additional information for the input field.
 * @property {string} [className] - Optional class name for styling purposes.
 * @property {TextareaHTMLAttributes<HTMLTextAreaElement>} [textareaAttributes] - Optional additional attributes for the textarea element.
 * @property {boolean} [isDebounce] - Optional boolean indicating whether debouncing is enabled for input value changes.
 * @property {ChangeEventHandler<HTMLTextAreaElement>} [onChange] - Optional onchange function for the textarea input.
 */
type TextareaInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  description?: string | ReactNode;
  className?: string;
  textareaAttributes?: TextareaHTMLAttributes<HTMLTextAreaElement>;
  isDebounce?: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

/**
 * TextareaInput is a component used for rendering a textarea input field.
 * It integrates with React Hook Form for form management.
 *
 * @template T - Type extending FieldValues for the control.
 * @param {TextareaInputProps<T>} props - Props object for the TextareaInput component.
 * @returns {JSX.Element} - Returns the JSX element for the textarea input field.
 */
const TextareaInput = <T extends FieldValues>({
  name,
  label,
  description,
  className,
  textareaAttributes,
  isDebounce,
  onChange,
}: TextareaInputProps<T>): JSX.Element => {
  const { getValues, setValue, control, trigger, watch } = useFormContext<T>();

  const [initValue, setInitValue] = useState<string>(getValues(name) ?? '');
  const timeRef = useRef<NodeJS.Timeout>();
  const watchedValue = watch(name);

  useEffect(() => {
    if (watchedValue !== getValues(name)) {
      setInitValue(getValues(name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValue]);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> =
    onChange ??
    (({ target }) => {
      setInitValue(target.value);

      if (isDebounce) {
        if (timeRef.current) clearTimeout(timeRef.current);
        timeRef.current = setTimeout(() => {
          setValue(name, target.value as any);
          trigger(name);
        }, 400);
      } else {
        setValue(name, target.value as any);
        trigger(name);
      }
    });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          <FormLabel className="text-[13px]">{label}</FormLabel>
          <FormControl>
            {!isDebounce ? (
              <Textarea
                {...field}
                {...textareaAttributes}
                onChange={(e) => (onChange ? onChange(e) : field.onChange(e))}
                className={`${error && 'border-[#ee4949]'}`}
              />
            ) : (
              <Textarea
                {...field}
                {...textareaAttributes}
                value={initValue}
                onChange={handleChange}
                className={`${error && 'border-[#ee4949]'} resize-none`}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-[13px]" />
        </FormItem>
      )}
    />
  );
};

const MemoizedTextareaInput = memo(TextareaInput) as <T extends FieldValues>(
  props: TextareaInputProps<T>,
) => JSX.Element;

export { MemoizedTextareaInput as TextareaInput };
