export const stringsTypeTransformer = {
  to(value: string[] | null | undefined): string {
    // Handle null or undefined by returning an empty string
    if (!value || !value.length) {
      return '';
    }
    // Convert array of enums to a comma-separated string
    return value.join(',');
  },
  from(value: string | null | undefined): string[] {
    // Handle null or undefined by returning an empty array
    if (!value || value == '') {
      return [];
    }
    // Convert comma-separated string back to an array of strings
    return value.split(',') as string[];
  },
};
