import { Fragment, memo } from 'react';
import { PaginationResponse } from '@/common/model';
import { SelectInput, TextInput } from '@/components/common/form-handle';
import { AttributeDynamic, SpuCreatNew } from '~spu-mnt/models';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Attribute } from '~attribute-mnt/models';
import { Button } from '@/components/ui';
import { X } from 'lucide-react';

const SpuCreateCommonAttr = memo(
  ({ listAttribute }: { listAttribute?: PaginationResponse<Attribute> }) => {
    const { control, setValue } = useFormContext<SpuCreatNew>();

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'commonAttributes',
    });

    return (
      <>
        <h3 className="mb-2 font-semibold">Thông số chung</h3>
        <div className="grid grid-cols-3 gap-x-5 gap-y-2 items-end">
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <SelectInput<SpuCreatNew>
                label="Thông số"
                name={`commonAttributes.${index}.k`}
                options={listAttribute?.data ?? []}
                typeOption="custom"
                displayLabel="name"
                displayValue="label"
                onChange={(value) => {
                  setValue(`commonAttributes.${index}.k`, value);
                  const matchingOption = listAttribute?.data.find(
                    (attribute) => attribute.label === value,
                  );
                  if (matchingOption) {
                    setValue(`commonAttributes.${index}.name`, matchingOption.name);
                    setValue(`commonAttributes.${index}.u`, matchingOption.unit);
                    setValue(`commonAttributes.${index}.v`, '');
                  }
                }}
              />
              <TextInput<SpuCreatNew>
                label="Giá trị"
                name={`commonAttributes.${index}.v`}
                isDebounce
              />
              {/* <TextInput<SpuCreatNew>
                label="Đơn vị"
                name={`commonAttributes.${index}.u`}
                isDebounce
              /> */}
              <Button
                variant="ghost"
                type="button"
                className="h-8 w-8 p-0"
                onClick={() => remove(index)}
              >
                <span className="sr-only">Open menu</span>
                <X className="h-4 w-4" />
              </Button>
            </Fragment>
          ))}
        </div>

        <Button
          className="mt-3"
          variant="redLight"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation();
            append(new AttributeDynamic());
          }}
        > 
          Thêm thông số
        </Button>
      </>
    );
  },
);

SpuCreateCommonAttr.displayName = SpuCreateCommonAttr.name;

export default SpuCreateCommonAttr;
