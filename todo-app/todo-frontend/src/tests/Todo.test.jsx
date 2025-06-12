import { render, screen } from "@testing-library/react";
import Todo from "../Todos/Todo";

describe("todo", () => {
  it("renders content", () => {
    const todo = {
      todo: { text: "testText", done: false },
      deleteTodo: vi.fn(),
      completeTodo: vi.fn(),
    };

    render(<Todo {...todo} />);

    expect(screen.getByText("testText")).toBeDefined();
  });
});