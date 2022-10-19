import { Option } from "types";

export interface JourneyLogFormData {
  description: string;
  hoursSpent: number;
  loggedOn: string;
  media: FileList;
  tags: Option[];
}
