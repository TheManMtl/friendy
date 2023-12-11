import db from "../models";
import models from "../models";
const User = models.User;

const friends: any = [];
const createFriends = async () => {

    const users = await db.User.findAll({ raw: true });

    /* TEST
    const users = await db.User.findByPk( 101, { 
        plain: true,
        include:  [
            {
            model: User,
            attributes: ['id', 'name'],
            as: "friendsA",
        },
        {
            model: User,
            attributes: ['id', 'name'],
            as: "friendsB"
        }, 
    ],
    nest: true
    });
*/

    for (let i = 0; i < users.length; i++) {

        const user = users[i];


        const uFiltered = users.filter((u: typeof User) => u.id != user.id)

        // add every 20th user
        for (let j = 0; j < uFiltered.length; j += 20) {

            // check if inverse friend record exists
            const inverse = await db.Friend.findOne({
                where:
                {
                    requestedbyId: uFiltered[j].id,
                    requestedToId: user.id,
                }
            });

            if (!inverse) {

                // new friendship
                const friend = {

                    requestedById: user.id,
                    requestedToId: uFiltered[j].id,
                    requestedAt: Date.now(),
                    acceptedAt: Date.now()
                }

                friends.push(friend);
                continue;
            }

            console.log("avoided inverse!");
        }
    }

    return friends;
}

const saveFriends = async () => {

    await createFriends().then( (friends) => {
  
      console.log(friends);
  
      friends.map((friend: any) => {
        db.Friend.create(friend);
      })
    })
  }

export default saveFriends;