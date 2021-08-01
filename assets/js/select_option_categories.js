async function renderSelectCategories(categories, selectID) {
    try {
        const select = document.getElementById(selectID);
        categories.forEach( (category) => {
            let option = document.createElement('option');
            //option.setAttribute('id', `${category.id || category.category_id}`);
            option.setAttribute('name', `${category.id || category.category_id}`);
            option.setAttribute('value', `${category.id || category.category_id}`);
            option.textContent = `${category.name || category.name_category}`;
            select.appendChild(option);
        });
    } catch (e) {
        throw new Error(e.message);
    }
}