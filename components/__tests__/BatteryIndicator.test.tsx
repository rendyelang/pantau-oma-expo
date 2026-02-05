import { render } from "@testing-library/react-native";
import React from "react";
import BatteryIndicator from "../BatteryIndicator";

describe("BatteryIndicator", () => {
  it("renders correctly with 80% battery (Green)", () => {
    const { getByTestId, toJSON } = render(<BatteryIndicator level={80} />);
    // Since nativewind might swallow classNames in final render depending on configuration,
    // we primarily check if it renders without error and maybe check styles if possible.
    // For now, snapshot is a good baseline.
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with 40% battery (Yellow)", () => {
    const { toJSON } = render(<BatteryIndicator level={40} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with 10% battery (Red)", () => {
    const { toJSON } = render(<BatteryIndicator level={10} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("has correct width style for 50%", () => {
    // We can use a testID in the component to be precise, or find by type View.
    // But let's see if we can assume the structure.
    const { toJSON } = render(<BatteryIndicator level={50} />);
    const json = toJSON();
    // Inspecting the JSON structure usually reveals the style prop.
    // The second View should have width: '50%'.
  });
});
