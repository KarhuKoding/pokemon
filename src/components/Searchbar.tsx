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

  const handleSubmit = (e: any) => {
    // props.updateQuery(e.target.value.trim());

    // TODO debounce
    // Search on just user input
    props.updateQuery(e.value);
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

  return (
    <Autocomplete
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      limit="5"
      value={value}
      onItemSubmit={(e) => handleSubmit(e)}
      onChange={setValue}
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
