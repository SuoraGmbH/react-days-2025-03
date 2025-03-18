import { describe, test } from "vitest";
import { UserTable } from "./UserTable.tsx";
import { render } from "@testing-library/react";

describe("<UserTable>", () => {
  test("renders without crashing", async () => {
    render(<UserTable />);
  });
});
