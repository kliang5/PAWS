//https://paws-a95bd.web.app/data/products.json changed to that when launch ./data/products.json
const appUrl = (window.location.protocol == "http:") ? './data/products.json' : 'https://paws-a95bd.web.app/data/products.json';

fetch(appUrl) 
    .then((response) => response.json())
    .then((json) => writeProduct(json))
    .then((json) => action(json));


function writeProduct(json){
    let index = 0;
    json.forEach(product => {
        if (product.active){
            const column = document.createElement('div');
            column.className = "column mx-6 productText"
            column.innerHTML = `
            <div class="subtitle">
                <h5><b>${product.title}</b></h5>
            </div><br>
            <div class="subtitle">
                <h5>${product.description}</h5>
            </div><br>
            <div class="content">
                <ul>
                    <li>
                    <h5>${product.highlighted_features[0]}</h5>
                    </li><br>
                    <li>
                    <h5>${product.highlighted_features[1]}</h5>
                    </li><br>
                    <li>
                    <h5>${product.highlighted_features[2]}</h5>
                    </li>
                </ul>
            </div><br>
            <div class="content">
                <h4>$${product.price}</h4>
            </div>
            <a class="button is-black is-medium" id="buyButton" href=${product.paymentLink}>Buy now</a>
            `;

            const columnElement = document.getElementById("products_list");
            columnElement.appendChild(column);
            if (index ==0){
                const image = document.getElementById("productImg");
                image.src = product.imageUrl;
            }

            if(index !=0){
                column.style.display = 'none';
            }
            index ++;
        }
    });
    return json
}

function action(json){
    
    let index = 0;

    const previousButton = document.getElementById("previousButton");
    previousButton.addEventListener('click', () => {
        console.log('Previous button was clicked');
        const productElements = document.querySelectorAll('.productText');

        if (index <= 0) {
            index = productElements.length - 1;
        } else {
            index--;
        }
        const image = document.getElementById("productImg");
        image.src = json[index].imageUrl;
        console.log({index});

        productElements.forEach((productElement) => {
            productElement.style.display = 'none';
        });

        productElements[index].style.display = 'block';
    });

    const nextButton = document.getElementById("nextButton");
    nextButton.addEventListener('click', () => {
        console.log('Next button was clicked');
        const productElements = document.querySelectorAll('.productText');
        
        if (index >= productElements.length-1) {
            index = 0;
        } else {
            index++;
        }
        const image = document.getElementById("productImg");
        image.src = json[index].imageUrl;
        console.log({index});

        productElements.forEach((productElement) => {
            productElement.style.display = 'none';
        });

        productElements[index].style.display = 'block';
    });

}


