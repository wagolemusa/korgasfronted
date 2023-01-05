import './styles.css'
function List({itemList, updateItemList } ){

    const deleteItemFromList = key =>{
        const newList = itemList.filter(itemObj => {
            return itemObj.key !== key;
        });
        updateItemList(newList);
    }

    let AddTotal = []

// Write a function with adds the values



    return (
        <>
         {
            
            itemList.map(itemObj =>{
                
                let xnum = itemObj.numberkgs * itemObj.cyliders
            
                return (
                    <div key={itemObj.key} className="items">
                        <p>{itemObj.numberkgs}kgs *  {itemObj.cyliders} cyliders </p>
                        <p>{xnum} </p>

                            <button onClick={() => deleteItemFromList(itemObj.key)} >X</button>
                    </div>
                    
                )
            })
            

         }
         {
            itemList.map(add =>{
                let num = add.numberkgs * add.cyliders

             AddTotal.push(num)
             let joinnum = AddTotal
             console.log([joinnum])
                
            let sum = 0;
             for(let index = 0; index < joinnum.length ; index++){
                     sum=sum+joinnum[index];
                }
            
            return sum

            // function add(n){
            //     let sum = 0;
            //     for(let index = 0; index < n.length ; index++){
            //         sum=sum+n[index];
            //      }
            //      return sum
            // }
            // console.log(add(joinnum))
            
            })
        } 
       

         

        </>
    )
}
export default List;