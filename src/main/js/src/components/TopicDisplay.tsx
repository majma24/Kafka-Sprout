import React from "react";
import {
  GridSectionContainer,
  GridContainer,
  HeaderRow,
  ContentRow,
  TopicRow,
} from "../UIComponents/GridSection";
import { GridTitleContainer, GridTitle } from "../UIComponents/GridTitle";
import { ButtonWithPopup, WhiteButtonWithPopup } from "../UIComponents/Buttons";
import TopicConfig from "./TopicConfig";
import TopicDelete from "./TopicDelete";

const TopicDisplay = (props) => {
  const headers = props.topicData[0];
  const rows = props.topicData.slice(1, props.topicData.length);
  // NOTE: this relies on the topic name always being the first thing in the row'
  const topicNames = rows.map((row) => row[0]);
  return (
    // name, leader, partition, replica
    <GridSectionContainer>
      <GridTitleContainer>
        <GridTitle>Topics</GridTitle>
        <ButtonWithPopup
          popup={<TopicConfig updateTopicList={props.updateTopicList} />}
        >
          + Add Topic
        </ButtonWithPopup>
        <WhiteButtonWithPopup
          popup={
            <TopicDelete
              topicNames={topicNames}
              updateTopicList={props.updateTopicList}
            />
          }
        >
          Delete Topic
        </WhiteButtonWithPopup>
      </GridTitleContainer>
      <GridContainer columns={headers.length}>
        <HeaderRow headers={headers} />
        {rows.map((row) => (
          <TopicRow content={row} />
        ))}
      </GridContainer>
    </GridSectionContainer>
  );
};

export default TopicDisplay;
