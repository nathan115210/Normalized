import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AutoComplete, { DataSourceType } from "./AutoComplete";

interface LakerPlayerProps {
  value: string;
  number: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const SynchronousRequestAutoComplete = () => {
  const lakers = [
    {
      value: "Kostas Antetokounmpo",
      number: 37,
    },
    {
      value: "Avery Bradley",
      number: 11,
    },
    {
      value: "Devontae Cacok",
      number: 12,
    },
    {
      value: "Kentavious Caldwell-Pope",
      number: 1,
    },
    {
      value: "Alex Caruso",
      number: 4,
    },
    {
      value: "Quinn Cook",
      number: 28,
    },
    {
      value: "Anthony Davis",
      number: 3,
    },
    {
      value: "Jared Dudley",
      number: 10,
    },
    {
      value: "Danny Green",
      number: 14,
    },
    { value: "Talen Horton-Tucker", number: 5 },
    { value: "Dwight Howard", number: 39 },
    {
      value: "LeBron James",
      number: 23,
    },
    {
      value: "Kyle Kuzma",
      number: 0,
    },
    {
      value: "JaVale McGee",
      number: 7,
    },
    {
      value: "Markieff Morris",
      number: 88,
    },
    {
      value: "Rajon Rondo",
      number: 9,
    },
    {
      value: "JR Smith",
      number: 21,
    },
    {
      value: "Dion Waiters",
      number: 18,
    },
  ];
  const handleFetch = (query: string) => {
    return lakers.filter((player) =>
      player.value.toLowerCase().includes(query)
    );
  };
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>;
    return (
      <>
        <strong>Name: {item.value}</strong>
        <p>Number: {itemWithNumber.number}</p>
      </>
    );
  };
  return (
    <>
      <p>
        Try to type any NBA Lakers Team player's name to get the full
        information, for example: james
      </p>
      <AutoComplete
        fetchSuggestions={handleFetch}
        onSelect={action("selected")}
        renderOption={renderOption}
      />
    </>
  );
};

const AsynchronousRequestAutoComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        const formatItems = items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
        return formatItems;
      });
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithGitHubProps = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <strong>Name: {itemWithGitHubProps.login}</strong>
        <p>Url: {itemWithGitHubProps.url}</p>
      </>
    );
  };
  return (
    <>
      <p>Try to type any github username to get full info</p>
      <AutoComplete
        fetchSuggestions={handleFetch}
        onSelect={action("selected")}
        renderOption={renderOption}
      />
    </>
  );
};

storiesOf("AutoComplete", module)
  .add("Synchronous request AutoComplete", SynchronousRequestAutoComplete)
  .add("Asynchronous request AutoComplete", AsynchronousRequestAutoComplete);
