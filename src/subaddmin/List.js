// import './styles.css'
// function List({itemList, updateItemList } ){

//     const deleteItemFromList = key =>{
//         const newList = itemList.filter(itemObj => {
//             return itemObj.key !== key;
//         });
//         updateItemList(newList);
//     }

//     let AddTotal = []

// // Write a function with adds the values



//     return (
//         <>
//          {
            
//             itemList.map(itemObj =>{
                
//                 let productNum = itemObj.numberkgs * itemObj.cyliders
            
//                 return (
//                     <div key={itemObj.key} className="items">
//                         <p>{itemObj.numberkgs}kgs *  {itemObj.cyliders} cyliders </p>

//                         <p>{Number(productNum)} </p>

//                             <button onClick={() => deleteItemFromList(itemObj.key)} >X</button>
//                     </div>
                    
//                 )
//             })
            

//          }

//          {
//             itemList.reduce((add, acc) => add + (acc.numberkgs * acc.cyliders), 0)
//         } 
       

         

//         </>
//     )
// }
// export default List;