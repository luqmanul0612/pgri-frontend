"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/app/share/libs/select";

interface IViewPelatihan {

}

type FormOption = {
  options: string
}

const ViewPelatihan: React.FC<IViewPelatihan> = () => {
  const { register, handleSubmit, setValue } = useForm<FormOption>(
    {
      defaultValues: {
        options: '',
      }
    }
  );

  const onSubmit: SubmitHandler<FormOption> = (data: any) => {
    console.log(data)
  }

  const handleSelectChange = (value: string) => {
    setValue("options", value);
    console.log(value);
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder={"Select an Option haha"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"option1"}>Option 1</SelectItem>
            <SelectItem value={"option2"}>Option 2</SelectItem>
          </SelectContent>
        </Select>

        <button type="submit">Submit</button>
      </form>
      <h1>Hello World Ini Pelatihan</h1>
    </>
  )
}

export default ViewPelatihan;
