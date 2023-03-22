const db = new Dexie('ShoppingApp')
db.version(1).stores( { items: '++id,name,price,isPurchased' } )

const itemForm = document.getElementById('itemForm')
const itemDiv = document.getElementById('itemDiv')
const totalPriceDiv = document.getElementById('totalPriceDiv')

const populateItemsDiv = async() => {
    const allItems = await db.items.reverse().toArray()

    itemDiv.innerHTML = allItems.map(item =>`
    <div class="item ${item.isPurchased && 'purchased'}">
        <label>
            <input type="checkbox" 
            class="checkbox" ${item.isPurchased && 'checked'} 
            onchange = "toggleItemStatus(event, ${item.id})">
        </label>

        <div class="item-info">
            <p>${item.name}</p>
            <p>₹${item.price} x ${item.quan}</p>
        </div>
    
        <div>
            <button class="delete-Button" onclick="removeItem(${item.id})">X</button>
        </div>
    </div>
    
    `).join('')

    const arrayOfPrices = allItems.map(item => item.price * item.quan)
    const totalPrice = arrayOfPrices.reduce((a, b) => a + b,0)

    totalPriceDiv.innerText = 'Total Price: ₹' + totalPrice
}

window.onload = populateItemsDiv

itemForm.onsubmit = async (event) => {
    event.preventDefault()

    const name = document.getElementById('name_input').value
    const quan = document.getElementById('quan_input').value
    const price = document.getElementById('price_input').value

    await  db.items.add({ name,quan,price })
    await populateItemsDiv()

    itemForm.reset()
}

const toggleItemStatus = async (event, id ) => {
    await db.items.update(id, {isPurchased: !!event.target.checked})
    await populateItemsDiv()
}

const removeItem = async (id) =>{
    await db.items.delete(id)
    await populateItemsDiv()
}