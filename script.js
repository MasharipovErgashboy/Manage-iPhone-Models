  // IPhone class
    class IPhone {
      constructor(processor, displayResolution, ram, rom) {
        this.processor = processor;
        this.displayResolution = displayResolution;
        this.ram = ram;
        this.rom = rom;
      }

      setSpecifications() {
        return `Processor: ${this.processor}, Display: ${this.displayResolution}, RAM: ${this.ram}GB, ROM: ${this.rom}GB`;
      }
    }

    // IModel interface
    class IModel {
      setModel() {
        return '';
      }
    }

    // Phone Model Class
    class PhoneModel extends IModel {
      constructor(modelName, processor, displayResolution, ram, rom) {
        super();
        this.modelName = modelName;
        this.processor = processor;
        this.displayResolution = displayResolution;
        this.ram = ram;
        this.rom = rom;
      }

      setModel() {
        return `Model: ${this.modelName}, Specifications: ${new IPhone(this.processor, this.displayResolution, this.ram, this.rom).setSpecifications()}`;
      }
    }

    const phoneList = [];
    const phoneListContainer = document.getElementById('phoneList');

    // Add Phone functionality
    document.getElementById('addPhoneButton').addEventListener('click', function() {
      const modelName = document.getElementById('modelName').value;
      const processor = document.getElementById('processor').value;
      const displayResolution = document.getElementById('displayResolution').value;
      const ram = document.getElementById('ram').value;
      const rom = document.getElementById('rom').value;

      if (modelName && processor && displayResolution && ram && rom) {
        const newPhone = new PhoneModel(modelName, processor, displayResolution, ram, rom);
        phoneList.push(newPhone);
        renderPhoneList();
        clearInputs();
      } else {
        alert('Please fill in all fields.');
      }
    });

    // Render phone list
    function renderPhoneList() {
      phoneListContainer.innerHTML = '';
      phoneList.forEach((phone, index) => {
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('card');

        const phoneInfo = document.createElement('div');
        phoneInfo.classList.add('card-info');
        phoneInfo.innerHTML = `<h3>${phone.modelName}</h3><p>${phone.setModel()}</p>`;

        const actions = document.createElement('div');
        actions.classList.add('card-actions');
        actions.innerHTML = `
          <button class="edit-btn" onclick="editPhone(${index})">Edit</button>
          <button class="delete-btn" onclick="deletePhone(${index})">Delete</button>
        `;

        phoneCard.appendChild(phoneInfo);
        phoneCard.appendChild(actions);
        phoneListContainer.appendChild(phoneCard);
      });
    }

    // Delete Phone functionality
    function deletePhone(index) {
      phoneList.splice(index, 1);
      renderPhoneList();
    }

    // Edit Phone functionality
    function editPhone(index) {
      const phone = phoneList[index];
      document.getElementById('modelName').value = phone.modelName;
      document.getElementById('processor').value = phone.processor;
      document.getElementById('displayResolution').value = phone.displayResolution;
      document.getElementById('ram').value = phone.ram;
      document.getElementById('rom').value = phone.rom;

      // Remove the phone from the list so it can be updated
      deletePhone(index);
    }

    // Clear input fields
    function clearInputs() {
      document.getElementById('modelName').value = '';
      document.getElementById('processor').value = '';
      document.getElementById('displayResolution').value = '';
      document.getElementById('ram').value = '';
      document.getElementById('rom').value = '';
    }
