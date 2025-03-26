
import { Checkbox } from "./checkbox";
import { Form as FormRoot } from "./form";
import { FormError } from "./form-error";
import { FormField } from "./form-field";
import { Input } from "./input";
import { MultiSelect } from "./multi-select";
import { Select } from "./select";
import { Switch } from "./switch";
import { Textarea } from "./textarea";

export const Form = {
  Input,
  Textarea,
  Field: FormField,
  Error: FormError,
  Root: FormRoot,
  Checkbox,
  Switch,
  Select,
  MultiSelect,
}