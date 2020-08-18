import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AutoComplete from "./AutoComplete";

const DefaultAutoComplete = () => {
  const lakers = [
    "Kostas Antetokounmpo",
    "Avery Bradley",
    "Devontae Cacok",
    "Kentavious Caldwell-Pope",
    "Alex Caruso",
    "Quinn Cook",
    "Anthony Davis",
    "Jared Dudley",
    "Danny Green",
    "Talen Horton-Tucker",
    "Dwight Howard",
    "LeBron James",
    "Kyle Kuzma",
    "JaVale McGee",
    "Markieff Morris",
    "Rajon Rondo",
    "JR Smith",
    "Dion Waiters",
  ];
  const handleFetch = (query: string) => {
    return lakers.filter((name) => name.toLowerCase().includes(query));
  };

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("selected")}
    />
  );
};

storiesOf("AutoComplete", module).add(
  "Default AutoComplete",
  DefaultAutoComplete
);
