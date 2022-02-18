let userData = null;
//TODO: UPDATE, Delete and Logout buttons 
window.addEventListener('DOMContentLoaded',()=>{
  userData = JSON.parse(sessionStorage.getItem('userData'));
const logoutBtn =  document.getElementById('logout');
   if (userData != null) {

    document.getElementById('guest').style.display = 'none';
    document.querySelector('#addForm .add').disabled = false;
    document.querySelector('.email > span').innerHTML = userData.email;
       
   } else {
    document.getElementById('user').style.display = 'none';
       logoutBtn.style.display = '';
   }

   document.querySelector('.load').addEventListener('click',loadData);
   
   document.getElementById('addForm').addEventListener('submit', onCreateSubmit);
   
   const catches = document.getElementById('catches');
   catches.addEventListener('click',onTableClick);
   
  logoutBtn.addEventListener('click',onLogout);

   });

   function onLogout() {
       sessionStorage.clear();
       window.location = '/index.html'

   }

    function onTableClick(event) {
       
    if (event.target.className == 'update') {

        const id = event.target.dataset.id;
       
        onUpdate(event.target,id);

    } else if (event.target.className == 'delete') {
       
        onDelete(event.target);
    }
}

async function onUpdate(button,id){
   
const currentCatchDiv = button.parentNode;

    const newAngler = currentCatchDiv.querySelector('.angler').value;
    const newBait = currentCatchDiv.querySelector('.bait').value;
    const newCaptureTime = currentCatchDiv.querySelector('.captureTime').value;
    const newLocation = currentCatchDiv.querySelector('.location').value;
    const newSpecies = currentCatchDiv.querySelector('.captureTime').value;
    const newWeight = currentCatchDiv.querySelector('.weight').value;

const updatedCatch = {
    angler: newAngler,
    bait: newBait,
    captureTime: newCaptureTime,
    location: newLocation,
    species: newSpecies,
    weight: newWeight
}
   
   
     
     try {
          if (Object.values(updatedCatch).some(value => value == '')) {
              throw new Error('All fields are required');
          }
         
         await updateCatch(id,updatedCatch);      

          loadData();
        }catch (err) {
            alert(err.message);
        }
}

async function updateCatch(id, huntCatch) {
    const url = 'http://localhost:3030/data/catches/' + id;

    const updatedCatch = await fetch(url, {
        method: 'PUT',
        headers: {'X-Authorization': userData.token},
        body: JSON.stringify(huntCatch)
    });
    return updatedCatch;
}

   async function onDelete(button) {
       const id = button.dataset.id;
       await deleteMethod(id);
       button.parentNode.remove();
   }

   async function deleteMethod(id){

    const response = await fetch('http://localhost:3030/data/catches/'+id,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
        'X-Authorization' : userData.token}
    });
    
    const result = await response.json();
   
    return result;
   }

   async function onCreateSubmit(event){
       event.preventDefault();

       if (!userData) {
           window.location = '/login.html';
           return
       }

      const formData = new FormData(event.target);

      //when the form is bigger and have many fields:
      const data = [...formData.entries()].reduce((acc,[key,value]) => Object.assign(acc,{[key]: value}),{});

      try {
          if (Object.values(data).some(value => value == '')) {
              throw new Error('All fields are required');
          }
          const response = await fetch('http://localhost:3030/data/catches',{
              method: 'POST',
              headers: {'Content-Type': 'application/json',
              'X-Authorization' : userData.token},
              body: JSON.stringify(data)
          });

          if (response.ok != true) {
              const err = await response.json();
            throw new Error(err.message);
          }

          loadData();
          event.target.reset();

      } catch (error) {
          alert(error.message);
      }

   }

  async function loadData(event){

    const response = await fetch('http://localhost:3030/data/catches');
    const data = await response.json();

    catches.replaceChildren(...data.map(createPreview))
    
   };

    function createPreview(item){

       const isOwner = (userData && item._ownerId == userData.id);

    const element = document.createElement('div');
    element.className = 'catch';
    element.innerHTML =`<label>Angler</label>
<input type="text" class="angler" value="${item.angler}" ${!isOwner ? 'disabled' : ''}>
<label>Weight</label>
<input type="text" class="weight" value="${item.weight}" ${!isOwner ? 'disabled' : ''}>
<label>Species</label>
<input type="text" class="species" value="${item.species}" ${!isOwner ? 'disabled' : ''}>
<label>Location</label>
<input type="text" class="location" value="${item.location}" ${!isOwner ? 'disabled' : ''}>
<label>Bait</label>
<input type="text" class="bait" value="${item.bait}" ${!isOwner ? 'disabled' : ''}>
<label>Capture Time</label>
<input type="number" class="captureTime" value="${item.captureTime}" ${!isOwner ? 'disabled' : ''}>
<button class="update" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Update</button>
<button class="delete" data-id="${item._id}" ${!isOwner ? 'disabled' : ''}>Delete</button>`;

return element;
   }