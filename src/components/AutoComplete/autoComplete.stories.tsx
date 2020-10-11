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
const simpleComplete = () => {
  const lakers = [
    "bradley",
    "pope",
    "caruso",
    "cook",
    "cousins",
    "james",
    "AD",
    "green",
    "howard",
    "kuzma",
    "McGee",
    "rando",
  ];
  const handleFetch = (query: string) => {
    return lakers
      .filter((name) => name.includes(query))
      .map((name) => ({ value: name }));
  };
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("selected")}
      placeholder="Try to type NBA Lakers team member's name"
    />
  );
};

const textComplete = `
### Code sample
~~~javascript
const lakers = [
    "bradley",
    "pope",
    "caruso",
    "cook",
    "cousins",
    "james",
    "AD",
    "green",
    "howard",
    "kuzma",
    "McGee",
    "rando",
  ];
  const handleFetch = (query: string) => {
    return lakers
      .filter((name) => name.includes(query))
      .map((name) => ({ value: name }));
  };
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("selected")}
      placeholder="Try to type NBA Lakers team member's name"
    />
  );
~~~
`;

const CustomDropDownAutoComplete = () => {
  const lakersWithNumber = [
    { value: "bradley", number: 11 },
    { value: "pope", number: 1 },
    { value: "caruso", number: 4 },
    { value: "cook", number: 2 },
    { value: "cousins", number: 15 },
    { value: "james", number: 23 },
    { value: "AD", number: 3 },
    { value: "green", number: 14 },
    { value: "howard", number: 39 },
    { value: "kuzma", number: 0 },
  ];
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((player) =>
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
    <div>
      <AutoComplete
        fetchSuggestions={handleFetch}
        onSelect={action("selected")}
        renderOption={renderOption}
        placeholder="Try to type any NBA Lakers Team player's name"
      />
    </div>
  );
};

const textCustom = `
### Code sample
~~~javascript
const lakersWithNumber = [
    { value: "bradley", number: 11 },
    { value: "pope", number: 1 },
    { value: "caruso", number: 4 },
    { value: "cook", number: 2 },
    { value: "cousins", number: 15 },
    { value: "james", number: 23 },
    { value: "AD", number: 3 },
    { value: "green", number: 14 },
    { value: "howard", number: 39 },
    { value: "kuzma", number: 0 },
  ];
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((player) =>
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
    <div>
      <p>
        Try to type any NBA Lakers Team player's name to get the full
        information, for example: james
      </p>
      <AutoComplete
        fetchSuggestions={handleFetch}
        onSelect={action("selected")}
        renderOption={renderOption}
        placeholder="Try to type any NBA Lakers Team player's name"
      />
    </div>
  );
~~~
`;

const AjaxAutoComplete = () => {
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
    <div>
      <AutoComplete
        fetchSuggestions={handleFetch}
        onSelect={action("selected")}
        renderOption={renderOption}
        placeholder="Try to type any github username to get full info"
      />
    </div>
  );
};

const textAjax = `
### Code sample
~~~javascript
const handleFetch = (query: string) => {
  return fetch('https://api.github.com/search/users?q='+ query)
    .then(res => res.json())
    .then(({ items }) => {
      return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
    })
}

const renderOption = (item: DataSourceType) => {
  const itemWithGithub = item as DataSourceType<GithubUserProps>
  return (
    <>
      <b>Name: {itemWithGithub.value}</b>
      <span>url: {itemWithGithub.url}</span>
    </>
  )
}
return (
  <AutoComplete 
    fetchSuggestions={handleFetch}
    onSelect={action("selected")}
    renderOption={renderOption}
    placeholder="Try to type any github username to get full info"
  />
)
~~~
`;

storiesOf("AutoComplete", module)
  .add("Simple Complete", simpleComplete, {
    info: { source: false, text: textComplete },
  })
  .add("Custom drop-down options", CustomDropDownAutoComplete, {
    info: { source: false, text: textCustom },
  })
  .add("Ajax AutoComplete", AjaxAutoComplete, {
    info: { source: false, text: textAjax },
  });
