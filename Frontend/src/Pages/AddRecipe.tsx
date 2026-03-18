const AddRecipe = () => {
  return (
    <>
      <section id="addrecipe">
        <form className="max-w-7xl m-auto p-6 text-white boder border-white space-y-2.5" >
          <div className="w-full p-1 flex justify-between">
            <label htmlFor="">Title</label>
            <input type="text" name="title" className=" outline-1" />
          </div>
          <div className="w-full p-1 flex justify-between">
            <label htmlFor="">Time</label>
            <input type="text" name="time" className="" />
          </div>
          <div className="w-full p-1 flex justify-between">
            <label htmlFor="">Ingredients</label>
            <textarea typeof="text" name="ingredients" rows={5} id=""></textarea>
          </div>
          <div className="w-full p-1 flex justify-between">
            <label htmlFor="">Instructions</label>
            <textarea typeof="text" name="instructions" rows={5}  id=""></textarea>
          </div>
          <div className="w-full p-1 flex justify-between">
            <label htmlFor="">Recipe Image</label>
            <input type="file" name="file"  />
          </div>
        </form>
      </section>
    </>
  );
};

export default AddRecipe;
