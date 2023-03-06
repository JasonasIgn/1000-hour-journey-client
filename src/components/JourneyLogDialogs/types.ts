import { Option } from "types";

export interface JourneyLogFormData {
  description: string;
  hoursSpent: number;
  loggedOn: string;
  media: FileList;
  activities: Option[];
}

export interface OptionWithColor extends Option {
  color?: string;
}
