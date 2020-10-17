import React, { useState } from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Icon28AddOutline from "@vkontakte/icons/dist/28/add_outline";
import {
  Header,
  FixedLayout,
  TabsItem,
  Tabs,
  Button,
  CellButton,
} from "@vkontakte/vkui";
import CitySearch from "./../components/CitySearch";

import "./Home.css";

const Home = ({ id }) => {
  const [viewAddresses, setViewAddresses] = useState(null);
  const buttonStyle = {
    width: "500pt",
  };
  return (
    <Panel id={id}>
      <PanelHeader>Homa</PanelHeader>
      <Div>
        <Group>
          <Div id="div-search">
          <CitySearch id="home-search" setViewAddresses={setViewAddresses} />
            {viewAddresses
              ? viewAddresses.map((viewAddresses, idx) => {
                  return (
                    <CellButton
                      key={idx}
                      onClick={() => {
                        setViewAddresses(null);
                      }}
                    >
                      {viewAddresses.fullName}
                    </CellButton>
                  );
                })
              : null}
          </Div>
        </Group>
        <Group header={<Header mode="secondary">Мои беседы</Header>}></Group>
      </Div>
      <Group></Group>
      <FixedLayout vertical="bottom">
        <Tabs>
          <TabsItem style={buttonStyle}>
            <Button size="xl" mode="commerce" before={<Icon28AddOutline />}>
              Создать
            </Button>
          </TabsItem>
        </Tabs>
      </FixedLayout>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Home;
