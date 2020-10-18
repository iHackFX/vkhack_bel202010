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
  Cell,
  Avatar,
  Link,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  Input,
  FormLayout,
  ActionSheet,
  ActionSheetItem,
  Textarea,
} from "@vkontakte/vkui";
import qr from "@vkontakte/vk-qr";
import CitySearch from "./../components/CitySearch";
import {
  getUserConversations,
  getPubConversations,
  createConversation,
} from "./../components/Requests";

import "./Home.css";

const Home = ({ id, fetchedUser, setModal, setPopout }) => {
  const [viewAddresses, setViewAddresses] = useState(null);
  const [conversations, setConversations] = useState(null);
  const [pubConversations, setPubConversations] = useState(null);
  const [city, setCity] = useState(null);
  const buttonStyle = {
    width: "500pt",
  };

  function addedPopout(url) {
    setPopout(
      <ActionSheet onClose={() => setPopout(null)}>
        <ActionSheetItem onClick={() => popoutQr(url)} autoclose>
          Показать QR-Код
        </ActionSheetItem>
        <Link href={url} target="_blank">
          <ActionSheetItem autoclose>Открыть</ActionSheetItem>
        </Link>
      </ActionSheet>
    );
  }

  function popoutQr(url) {
    const qrSvg = qr.createQR(url, {
      qrSize: 256,
      isShowLogo: true,
      isShowBackground: true,
    });
    setPopout(
      <ActionSheet onClose={() => setPopout(null)}>
        <ActionSheetItem autoclose>
          <span
            className="qr-code"
            dangerouslySetInnerHTML={{ __html: qrSvg }}
          />
        </ActionSheetItem>
      </ActionSheet>
    );
  }

  function createConversationsModal() {
    setModal(
      <ModalRoot activeModal={"modal-create"} onClose={() => setModal(null)}>
        <ModalPage
          id="modal-create"
          onClose={() => setModal(null)}
          header={<ModalPageHeader>Создание беседы</ModalPageHeader>}
        >
          <Div>
            <FormLayout>
              <Textarea
                id="create-location"
                value={city ? city : ""}
                top="Адрес"
                bottom="Выберите адрес в поиске на главной"
                disabled
              ></Textarea>
              <Input id="create-name" type="text" top="Название беседы"></Input>
              <Button
                size="xl"
                onClick={() =>{
                  var a = createConversation(
                    document.getElementById("create-name").value,
                    fetchedUser.id,
                    document.getElementById("create-location").value,
                    setPopout
                  );
                  if (a === "Error"){
                    setPopout(
                      <ActionSheet onClose={() => setPopout(null)}>
                        <ActionSheetItem autoclose>
                          На сегодня всё! Лимит!
                        </ActionSheetItem>
                      </ActionSheet>
                    );
                  }
                }
                }
                mode="commerce"
                before={<Icon28AddOutline />}
              >
                Создать
              </Button>
            </FormLayout>
          </Div>
        </ModalPage>
      </ModalRoot>
    );
  }
  return (
    <Panel id={id}>
      <PanelHeader>HOMА</PanelHeader>
      <Div>
        <Group>
          <Div id="div-search">
            <CitySearch
              id="home-search"
              value={city}
              setViewAddresses={setViewAddresses}
              setPubConversations={setPubConversations}
            />
            {viewAddresses
              ? viewAddresses.map((viewAddresses, idx) => {
                  return (
                    <CellButton
                      key={idx}
                      onClick={() => {
                        getPubConversations(
                          viewAddresses.fullName,
                          setPubConversations
                        );
                        setCity(viewAddresses.fullName);
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
        <Group
          header={
            <Header mode="secondary">
              {pubConversations ? "Беседы дома" : "Мои беседы"}
            </Header>
          }
        >
          <Div>
            {pubConversations ? (
              pubConversations.map((pubConversations, idx) => {
                return (
                  <Link
                    key={idx}
                    href={pubConversations.invite}
                    target="_blank"
                  >
                    <Cell before={<Avatar src="https://sun9-76.userapi.com/LYAFbZ7MpqMxsm3UWY8fyuL3T94ergKBUJ6zRg/p4F07S72ZT4.jpg" size={40} />}>
                      {pubConversations.name}
                    </Cell>
                  </Link>
                );
              })
            ) : conversations ? (
              conversations.map((conversations, idx) => {
                return (
                  <Cell
                    key={idx}
                    onClick={() => addedPopout(conversations.invite)}
                    before={<Avatar src={fetchedUser.photo_200} size={40} />}
                  >
                    {conversations.name}
                  </Cell>
                );
              })
            ) : (
              <Button
                size={"xl"}
                stretched
                onClick={() =>
                  getUserConversations(fetchedUser.id, setConversations)
                }
              >
                Получить беседы
              </Button>
            )}
            <br />
            <br />
            <br />
          </Div>
        </Group>
      </Div>
      {viewAddresses ? <FixedLayout vertical="bottom">
        <Tabs>
          <TabsItem style={buttonStyle}>
             <Button
              size="xl"
              onClick={() => createConversationsModal()}
              mode="commerce"
              before={<Icon28AddOutline />}
            >
              Создать
            </Button> 
          </TabsItem>
        </Tabs>
      </FixedLayout> : ""}
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
