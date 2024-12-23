import { ProductType } from 'src/modules/product/entities/product.entity';

export const productTypeTransformer = {
  to(value: ProductType[] | null | undefined): string {
    // Handle null or undefined by returning an empty string
    if (!value || !value.length) {
      return '';
    }
    // Convert array of enums to a comma-separated string
    return value.join(',');
  },
  from(value: string | null | undefined): ProductType[] {
    // Handle null or undefined by returning an empty array
    if (!value || value == '') {
      return [];
    }
    // Convert comma-separated string back to an array of enums
    return value.split(',') as ProductType[];
  },
};
