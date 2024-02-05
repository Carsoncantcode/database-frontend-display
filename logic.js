document.addEventListener('DOMContentLoaded', () => {
    fetchData()

    document.getElementById('createPerson').addEventListener('click', function() {
        createData('firstName', 'lastName', 'phoneNumber', 'email')
    })

})

async function fetchData() {
    const url = 'http://127.0.0.1:8000/api/retrieve_all';

    try {
        const response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Accept': 'application/json' 
            }
        });

        if (!response.ok) {
            
            throw new Error(`Error! status: ${response.status}`);
        }

        const data = await response.json(); 
        console.log(data); 
        const tableBody = document.getElementById('peopleTable');

        data.forEach(person => {
            const row = document.createElement('tr');

            const firstNameCell = document.createElement('td');
            firstNameCell.textContent = `${person.first_name} ${person.last_name}`;
            firstNameCell.classList.add('whitespace-nowrap', 'py-4', 'pl-4', 'pr-3', 'text-sm', 'font-medium', 'text-gray-900', 'sm:pl-0');

            

            const emailCell = document.createElement('td');
            emailCell.textContent = person.email;
            emailCell.classList.add('whitespace-nowrap', 'px-3', 'py-4', 'text-sm', 'text-gray-500');

            const phoneCell = document.createElement('td');
            phoneCell.textContent = person.phone_number;
            phoneCell.classList.add('whitespace-nowrap', 'px-3', 'py-4', 'text-sm', 'text-gray-500');

            const deleteCell = document.createElement('td');
            deleteCell.classList.add('relative', 'whitespace-nowrap', 'py-4', 'pl-3', 'pr-4', 'text-right', 'text-sm', 'font-medium', 'sm:pr-0');

            const deleteSpan = document.createElement('span');
            deleteSpan.textContent = 'Delete'
            deleteSpan.classList.add ('text-red-600', 'hover:text-red-900', 'cursor-pointer')

            deleteCell.appendChild(deleteSpan)

            row.appendChild(firstNameCell);
            row.appendChild(emailCell);
            row.appendChild(phoneCell);
            row.appendChild(deleteCell);

            deleteCell.addEventListener('click', function() {
                deleteData(person.id, row)
            })

        
            tableBody.appendChild(row);
        }); 
    } catch (error) {
        console.error('There was an error fetching the data:', error);
    }
}

async function deleteData(id, element) {
    const url = `http://127.0.0.1:8000/api/delete/${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE', 
            headers: {
                'Accept': 'application/json' 
            }
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        console.log("Data deleted successfully.");
        element.remove()
    } catch (error) {
        console.error('There was an error deleting the data:', error);
    }
}

async function createData(firstName, lastName, phoneNumber, email) {
    const url = 'http://127.0.0.1:8000/api/create';
    const input = {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email
    };

    try {
        const response = await fetch(url, {
            method: 'POST', // Method itself
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input) 
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const data = await response.json(); 
        console.log(data); 

        const tableBody = document.getElementById('peopleTable');

        
        data.forEach(person => {
            const row = document.createElement('tr');

            const firstNameCell = document.createElement('td');
            firstNameCell.textContent = `${person.first_name} ${person.last_name}`;
            firstNameCell.classList.add('whitespace-nowrap', 'py-4', 'pl-4', 'pr-3', 'text-sm', 'font-medium', 'text-gray-900', 'sm:pl-0');

            

            const emailCell = document.createElement('td');
            emailCell.textContent = person.email;
            emailCell.classList.add('whitespace-nowrap', 'px-3', 'py-4', 'text-sm', 'text-gray-500');

            const phoneCell = document.createElement('td');
            phoneCell.textContent = person.phone_number;
            phoneCell.classList.add('whitespace-nowrap', 'px-3', 'py-4', 'text-sm', 'text-gray-500');

            const deleteCell = document.createElement('td');
            deleteCell.classList.add('relative', 'whitespace-nowrap', 'py-4', 'pl-3', 'pr-4', 'text-right', 'text-sm', 'font-medium', 'sm:pr-0');

            const deleteSpan = document.createElement('span');
            deleteSpan.textContent = 'Delete'
            deleteSpan.classList.add ('text-red-600', 'hover:text-red-900', 'cursor-pointer')

            deleteCell.appendChild(deleteSpan)

            row.appendChild(firstNameCell);
            row.appendChild(emailCell);
            row.appendChild(phoneCell);
            row.appendChild(deleteCell);

            deleteCell.addEventListener('click', function() {
                deleteData(person.id, row)
            })

        
            tableBody.appendChild(row);
        }); 
        return data; 
    } catch (error) {
        console.error('There was an error creating the data:', error);
    }
}