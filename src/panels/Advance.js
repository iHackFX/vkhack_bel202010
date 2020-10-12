import React from 'react';
import PropTypes from "prop-types";
import { platform, IOS, Button } from "@vkontakte/vkui";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";

import Advance_img from "../img/persik.png";
import "./Persik.css";

const osName = platform();


const Advance = (props) => (
  <Panel id={props.id}>
    <PanelHeader
      left={
        <PanelHeaderButton onClick={props.go} data-to="home">
          {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
        </PanelHeaderButton>
      }
    >
      Advance
    </PanelHeader>
    <img className="Advance" src={Advance_img} alt="Advance The Cat" />
    <Button size="xl" onClick={null} stretched>show me persik</Button>
  </Panel>
);



Advance.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
};

export default Advance;
