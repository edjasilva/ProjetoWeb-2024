document.getElementById("delte_alert").addEventListener("click", function (event) {
    event.preventDefault();    
    Swal.fire({
     title: "Tem Certeza?",
       html: `
   <div class="container">
     <div class="row">
       <div class="col-md-6">
         <h4 class="small-text">
           Ao excluir a sua conta, você não poderá fazer mais login
           no Lisbon Spots e perderá todos os seus privilégios.
           Precisa de ajuda?
           <a href="../html/support.html">Visite ao nosso suporte</a>
         </h4>
         <button
           id="confirmDeleteButton"
           class="btn btn-block"
           style="
             background-image: url('../img/buttonAzulejo\ 1.png');
             background-size: cover;
             border-color: black;
             font-size: small;
           "
         >
           Sim, excluir Conta
         </button>
         <button
           id="cancelDeleteButton"
           class="btn btn-block mt-3"
           style="
             background-image: url('../img/buttonAzulejo\ 1.png');
             background-size: cover;
             border-color: black;
             font-size: small;
           "
         >
           Não, permanecer com a conta
         </button>
       </div>
       <div class="col-md-6">
         <img
           class="imagedel"
           src="../img/boywithquestionmark.png"
           width="auto"
           height="200"
           style="padding-left: 20px"
         />
       </div>
     </div>
   </div>
 `,
       showConfirmButton: false,
       showCancelButton: false,
       //showCloseButton: true,
       focusConfirm: false,
       //customClass: {
       //  closeButton: "cross-circle",
       //},
     });

     document
       .getElementById("confirmDeleteButton")
       .addEventListener("click", function () {
         Swal.fire({
           html: `
     <div class="container">
       <div class="row">
         <div class="col-md-6">
           <h1 class="text-left mb-4" style= "font-size:30px; padding-top:0px; font-weight:600;">Conta excluída</h1>
           <div class="row justify-content-center align-items-center">
             <div class="col-md-9"> 
               <div class="left-aligned">
                 <div>
                   <h4 class="small-text" style="padding-top: 10px; padding-right: 10px; width: 130%"> 
                     A sua conta foi excluída. Se isso foi feito por engano
                     ou se você tiver alguma dúvida,
                     <a href="../html/support.html"
                       >Visite o nosso suporte</a
                     >
                   </h4>
                 </div>
               </div>
             </div>
             <div class="col-md-2"> 
               <img
                 class="imagedel"
                 src="../img/delete.png"
                 width="220"
                 height="auto"
                 style="padding-left: 20px"
               />
             </div>
           </div>
         </div>
       </div>
     </div>
   `,
           focusConfirm: false,
           showCloseButton: false,
           showCancelButton: false,
           showConfirmButton: false,
         });
       });

     document
       .getElementById("cancelDeleteButton")
       .addEventListener("click", function () {
         Swal.close();
       });
   });