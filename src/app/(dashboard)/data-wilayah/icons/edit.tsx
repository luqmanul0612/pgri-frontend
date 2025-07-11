import * as React from "react";
import { SVGProps } from "react";
const Edit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      stroke="#17A3B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M9.944 2.7 3.786 9.218c-.232.247-.457.735-.502 1.072l-.278 2.43c-.097.878.533 1.478 1.403 1.328l2.415-.413c.337-.06.81-.307 1.042-.562l6.158-6.518c1.065-1.125 1.545-2.407-.113-3.975-1.65-1.552-2.902-1.005-3.967.12Z"
    />
    <path
      stroke="#17A3B8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M8.918 3.787a4.595 4.595 0 0 0 4.088 3.863M2.25 16.5h13.5"
    />
  </svg>
);
export default Edit;
