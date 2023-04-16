import {
  ActionIcon,
  Autocomplete,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconSearch } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "@/misc/constants";

export function InputWithButton(props: any) {
  const theme = useMantineTheme();
  const [value, setValue] = useState("");
  const [names, setNames] = useState([]);

  const handleChange = (e: any) => {
    // props.updateQuery(e.target.value.trim());
    console.log(e);
    // TODO debounce
    setValue(e)
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        API_BASE_URL + "pokemon?limit=100000&offset=0"
      );
      const newData = await response.json();
      setNames(newData.results.map((el: any) => el.name));
    };

    fetchData();
  }, []);

//   useEffect(() => {
//     console.log(value);
//   }, [value]);

  return (
    <Autocomplete
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      value={value}
      onChange={(e) => handleChange(e)}
      data={names.length ? [...names] : ["Asd"]}
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search Pokemon"
      rightSectionWidth={42}
      {...props}
    />
  );
}
