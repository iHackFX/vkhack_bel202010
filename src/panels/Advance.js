import React from "react";
import PropTypes from "prop-types";
import { platform, IOS } from "@vkontakte/vkui";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";

const osName = platform();

const Advance = (props) => {
  return (
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
      <img
        src={
          "https://sun9-9.userapi.com/cMz7a67sqKpQApSPjYFZXj93UKRL9SSdsGlhrA/8Oo_W_oF7Ow.jpg"
        }
        alt="Advance The Cat"
      />
    </Panel>
  );
};

Advance.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  setPopout: PropTypes.func,
};

export default Advance;
