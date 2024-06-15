"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState, useEffect } from "react";
import {useRouter} from "next/navigation";

export default function Filter(props:{
    query: string;
    values: string[];
    default: string;
}) {
    const router = useRouter();
    const [value, setValue] = useState(props.default);
    useEffect(()=>{
        router.push(`?${props.query}=${value}`)
    },[value, props.query, router])
  return (
    <Select onValueChange={setValue}>
      <SelectTrigger className="w-[180px] max-w-[180px]">
        <SelectValue placeholder="Filter By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            props.values.map((value) => {
              return (
                <SelectItem
                  key={value}
                  value={value}
                >
                  {value}
                </SelectItem>
              );
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
