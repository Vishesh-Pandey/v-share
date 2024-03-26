import React from "react";

export interface SharedTextType {
  id: string;
  content: React.JSX.Element | Element | string;
  text: string | undefined;
  createdOn: string;
  user: string;
  canCopy: boolean;
  viewOnce: boolean;
  views: number;
}
