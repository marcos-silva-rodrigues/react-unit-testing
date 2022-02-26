import {
  render,
  waitFor,
  screen
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { List } from "./components/List";

describe("App Component", () => {
  it("should render list items", () => {
    const { getByText, rerender, queryByText, unmount } = render(
      <List initialItems={["Fulano", "Ciclano", "Beltrano"]} />
    );

    expect(getByText("Fulano")).toBeInTheDocument();
    expect(getByText("Ciclano")).toBeInTheDocument();
    expect(getByText("Beltrano")).toBeInTheDocument();

    unmount();
    rerender(<List initialItems={["Testando"]} />);

    expect(getByText('Testando')).toBeInTheDocument();
    expect(queryByText('Fulano')).not.toBeInTheDocument();
  });

  it("should be able to add new item to the list", async () => {
    const { getByText, getByPlaceholderText } = render(
      <List initialItems={[]} />
    );

    const inputElement = getByPlaceholderText("Novo item");
    const addButton = getByText("Adicionar");

    userEvent.type(inputElement, "Novo");
    userEvent.click(addButton);
    // expect(await findByText('Novo')).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText("Novo")).toBeInTheDocument();
    });
  });

  it("should be able to add remove item from the list", async () => {
    const { getAllByText, queryByText } = render(
      <List initialItems={["Fulano", "Ciclano", "Beltrano"]} />
    );

    const removeButtons = getAllByText("Remover");

    userEvent.click(removeButtons[0]);

    // await waitForElementToBeRemoved(() => {
    //   return getByText('Fulano');
    // })

    await waitFor(() => {
      expect(queryByText("Fulano")).not.toBeInTheDocument();
    });
  });
});
