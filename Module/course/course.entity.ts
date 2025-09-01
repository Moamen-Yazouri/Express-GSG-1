import { IBaseMetadata } from "@/common/repos/types";

export interface ICourse extends IBaseMetadata {
  title: string;
  description: string;
  image?: string | undefined; 
}