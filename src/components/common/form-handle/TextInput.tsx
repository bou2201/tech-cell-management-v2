'use client';

import { ChangeEventHandler, InputHTMLAttributes, ReactNode, memo, useState, useRef } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui';
import { FormReturn } from './form.type';

/**
 * TextInputProps defines the props for the TextInput component.
 *
 * @template T - Type extending FieldValues for the control.
 * @property {FieldPath<T>} name - The name/path of the field in the form.
 * @property {string} label - The label for the text input field.
 * @property {string | ReactNode} [description] - Optional description or additional information for the input field.
 * @property {string} [className] - Optional class name for styling purposes.
 * @property {InputHTMLAttributes<HTMLInputElement>} [inputAttributes] - Optional additional attributes for the input element.
 * @property {FormReturn<T>} formReturn - Object containing necessary form control functions and properties.
 * @property {boolean} [isDebounce] - Optional boolean indicating whether debouncing is enabled for input value changes.
 * @property {ChangeEventHandler<HTMLInputElement>} [onChange] - Optional onchange function for the text input.
 */
type TextInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  description?: string | ReactNode;
  className?: string;
  inputAttributes?: InputHTMLAttributes<HTMLInputElement>;
  formReturn: FormReturn<T>;
  isDebounce?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

/**
 * TextInput is a component used for rendering a text input field.
 * It integrates with React Hook Form for form management.
 *
 * @template T - Type extending FieldValues for the control.
 * @param {TextInputProps<T>} props - Props object for the TextInput component.
 * @returns {JSX.Element} - Returns the JSX element for the text input field.
 */
const TextInput = <T extends FieldValues>({
  name,
  label,
  description,
  className,
  inputAttributes,
  formReturn,
  isDebounce = false,
  onChange,
}: TextInputProps<T>): JSX.Element => {
  const { getValues, setValue, control, trigger } = formReturn;

  const [initValue, setInitValue] = useState<string>(getValues(name) ?? '');
  const timeRef = useRef<NodeJS.Timeout>();

  const handleChange: ChangeEventHandler<HTMLInputElement> =
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
              <Input
                {...field}
                {...inputAttributes}
                onChange={(e) => (onChange ? onChange(e) : field.onChange(e))}
                className={`${error && 'border-[#ee4949]'}`}
              />
            ) : (
              <Input
                {...field}
                {...inputAttributes}
                value={initValue}
                onChange={handleChange}
                className={`${error && 'border-[#ee4949]'}`}
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

const MemoizedTextInput = memo(TextInput) as <T extends FieldValues>(
  props: TextInputProps<T>,
) => JSX.Element;

export { MemoizedTextInput as TextInput };
