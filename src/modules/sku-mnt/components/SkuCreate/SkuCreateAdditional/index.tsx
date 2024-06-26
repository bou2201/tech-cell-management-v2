import { PaginationResponse } from '@/common/model';
import { MultiSelectInput, RichTextInput } from '@/components/common/form-handle';
import { SkuCreateNew } from '~sku-mnt/models';
import { Tag } from '~tag-mnt/models';

type SkuCreateAdditionalProps = {
  listTag?: PaginationResponse<Tag>;
};

const SkuCreateAdditional = ({ listTag }: SkuCreateAdditionalProps) => {
  return (
    listTag && (
      <>
        <h3 className="mb-2 font-semibold">Thông tin bổ sung</h3>
        <div className="grid grid-cols-4 gap-x-5 gap-y-3 mb-3">
          <MultiSelectInput<SkuCreateNew, Tag>
            label="Tiêu chí lọc"
            name="tags"
            options={listTag?.data ?? []}
            displayLabel="name"
            displayValue="_id"
          />
        </div>
        <RichTextInput<SkuCreateNew> label="Mô tả" name="description" />
      </>
    )
  );
};

export default SkuCreateAdditional;
