import React from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import { Header, FixedLayout, TabsItem, Tabs, Button } from "@vkontakte/vkui";
import CitySearch from "./../components/CitySearch";

import "./Home.css";

const Home = ({ id }) => (
  <Panel id={id}>
    <PanelHeader>Homa</PanelHeader>
    <Div>
      <CitySearch id="home-search" />
      <Group header={<Header mode="secondary">Мои беседы</Header>}>
		  <h1>1</h1>
		  <h1>2</h1>
		  <h1>3</h1>
		  <h1>4</h1>
		  <h1>5</h1>
		  <h1>6</h1>
		  <h1>7</h1>
		  <h1>8</h1>
		  <h1>9</h1>
		  <h1>10</h1>
		  <h1>11</h1>
		  <h1>12</h1>
		  <h1>13</h1>
		  <h1>14</h1>
		  <h1>15</h1>
		  <h1>16</h1>
		  <h1>17</h1>
		  <h1>18</h1>
		  <h1>19</h1>
		  <h1>20</h1>
		  <h1>21</h1>
		  <h1>22</h1>
		  <h1>23</h1>
		  <h1>24</h1>
		  <h1>25</h1>
		  <h1>26</h1>
		  <h1>27</h1>
		  <h1>28</h1>
		  <h1>29</h1>
		  <h1>30</h1>
		  <h1>31</h1>
		  <h1>32</h1>
		  <h1>33</h1>
		  <h1>34</h1>
		  <h1>35</h1>
		  <h1>36</h1>
		  <h1>37</h1>
		  <h1>38</h1>
		  <h1>39</h1>
		  <h1> 40</h1>
	  </Group>
    </Div>
    <Group></Group>
    <FixedLayout vertical="bottom">
      <Tabs>
        <TabsItem>
            <Button size="xl" mode="commerce" before={<Icon28AddOutline/>}>Создать</Button>
        </TabsItem>
      </Tabs>
    </FixedLayout>
  </Panel>
);

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
