import React from "react";

import UNIT_RATIO from "@constants/unit_ratio";

import UnitConvertTab from "@components/tools/UnitConvertTab";
import MyTabs from "@components/MyTabs";

const UnitConverter = () => {
  return (
    <MyTabs>
      {UNIT_RATIO.map((tab, index) => (
        <MyTabs.Tab key={index} title={tab.title}>
          <UnitConvertTab tab={tab} />
        </MyTabs.Tab>
      ))}
    </MyTabs>
  );
};

UnitConverter.title = "Unit Converter";
export default UnitConverter;
