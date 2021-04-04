class Product{
    constructor(title, price){
        this.title = title;
        this.price = price;
    }
}

class InvoiceItemNode{
    constructor(quantity, product){
        this.quantity = quantity;
        this.product = product;
        this.next = null;
    }

    getTotalPrice(){
        return this.product.price * this.quantity;
    }
}

class Invoice{
    constructor(invoiceNumber, invoiceDate, company, companyAdress, billToName, billToAdress){
        this.invoiceNumber = invoiceNumber;
        this.invoiceDate = invoiceDate;
        this.company = company;
        this.companyAdress = companyAdress;
        this.billToName = billToName;
        this.billToAdress = billToAdress;
        this.invoiceItemHeadNode = null;
    }

    amountDue(taxes){
        let totalPrice = 0;
		let currentNode = this.invoiceItemHeadNode;
        while(currentNode != null){
            totalPrice = totalPrice + currentNode.getTotalPrice();
			currentNode = currentNode.next;
        }
		return taxes ? totalPrice += totalPrice * 0.1: totalPrice;
    }

    printBuyingItems(){
        console.log("Printing the Item List...");
        let currentNode = this.invoiceItemHeadNode;
        while(currentNode != null){
            console.log("item :" + currentNode.product.title + ", price :" + currentNode.product.price + ", quantity :" + currentNode.quantity);
            currentNode = currentNode.next;
        }
    }

    printInvoice(){
        console.log("Invoice");
        console.log("No : " + this.invoiceNumber);
        console.log("INVOICE DATE : " + this.invoiceDate);
        console.log("SHIP TO : " + this.company);
        console.log("ADDRESS : " + this.companyAdress);
        console.log("BILL TO : " + this.billToName);
        console.log("ADDRESS : " + this.billToAdress);

        let currentNode = this.invoiceItemHeadNode;
        while(currentNode != null){
            console.log(currentNode.product.title + "($" + currentNode.product.price + ")--- " + currentNode.quantity + " pcs. --- AMOUNT: " + currentNode.getTotalPrice());
            currentNode = currentNode.next;
        }
        console.log("SUBTOTAL : " + this.amountDue(false));
        console.log("TAX : " + (this.amountDue(false) * 0.1));
        console.log("TOTAL : " + this.amountDue(true));
    }
}

// shampoo, $10, 7pc
// conditioner, $5, 9pc
// tooth brush, $3, 10pc

// invoice
// UC1234567890
// 2020/05/06
// Recursion
// Los Angles
// Steven
// Dallas

let invoice = new Invoice("UC1234567890", "2020/05/06", "Recursion", "Los Angels", "Steven", "Dallas");

let firstItem = new InvoiceItemNode(7, new Product("shampoo", 10));
invoice.invoiceItemHeadNode = firstItem;

let secondItem = new InvoiceItemNode(9, new Product("conditioner", 5));
firstItem.next = secondItem;

let thirdItem = new InvoiceItemNode(10, new Product("tooth brush", 3));
secondItem.next = thirdItem;

invoice.printBuyingItems();
invoice.printInvoice();

console.log(invoice.amountDue(false));
console.log(invoice.amountDue(true));