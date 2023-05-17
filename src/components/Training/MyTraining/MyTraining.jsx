import { useState } from "react";
import { useGetAllUserBooksQuery } from "../../../redux/slices/bookApi";
import Select from "react-select";

export const MyTraining = () => {
  const {
    data: { goingToRead } = [],
    // isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetAllUserBooksQuery();

  const renderLabel = () => {
    const rendering = [];
    goingToRead?.map(({ _id, title, author }) => {
      let label = { value: `${_id}`, label: `${title}: ${author}` };
      rendering.push(label);
      return label;
    });
    return rendering;
  };

  const [startDate, setStartDate] = useState("");
  const [stopDate, setStopDate] = useState("");
  const [trainingBooks, setTrainingBooks] = useState([]);
  const [selectBook, setSelectBook] = useState("");

  const inputChange = (e) => {
    const { name, value } = e.target;
    if (name === "start") {
      setStartDate(value);
    }
    if (name === "stop") {
      setStopDate(value);
    }
  };

  const resetForm = () => {
    setStartDate("");
    setStopDate("");
  };

  const handleSelectedBook = (selectedBook) => {
    setSelectBook(selectedBook);
    console.log(`Selected: ${selectBook.value}`);
  };

  const handleAddBooksToTraining = async (e) => {
    e.preventDefault();
    goingToRead.map((book) => {
      if (book._id === selectBook.value) {
        console.log("find");
        console.log(book);
        setTrainingBooks((oldBooks) => [...oldBooks, book._id]);
      }
      return trainingBooks;
    });
    console.log(startDate, stopDate, trainingBooks);
    resetForm();
  };

  const viewTrainingBook = goingToRead?.filter((b) =>
    trainingBooks.includes(b._id)
  );

  const deleteAddBook = (id) => {
    console.log(trainingBooks)

    console.log("Delete")
    setTrainingBooks(() => trainingBooks.filter((bk) => bk !== id))
    console.log(trainingBooks.map((b)=> console.log("del" , b, id ) ))
  }

  return (
    <>
      <p>My Training</p>
      <form>
        <input
          type="text"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          name="start"
          value={startDate}
          required
          placeholder="Start"
          onChange={inputChange}
        />
        <input
          type="text"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          name="stop"
          value={stopDate}
          required
          placeholder="Finish"
          onChange={inputChange}
        />
        <Select options={renderLabel()} onChange={handleSelectedBook} />
        <div>
          {viewTrainingBook?.map(({ _id, title, author }) => (
            <li key={_id}>
              {title} {author} <button type="button" onClick={() => deleteAddBook(_id)}>delete</button>
            </li>
          ))}
        </div>
        <button type="submit" onClick={handleAddBooksToTraining}>
          Add book
        </button>
        <div>{selectBook && <>You've selected {selectBook.value}</>}</div>
      </form>
    </>
  );
};