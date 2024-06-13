import { enumCollectionNames } from "../enums/collectionNames";
import { enumProfile } from "../enums/profile";

export class EnumHandler
{
    public static profileToCollection(value : enumProfile) : enumCollectionNames 
    {
        let collectionName! : enumCollectionNames;
        
        collectionName = enumCollectionNames.Clients;

        if(value != enumProfile.Client)
        {
            collectionName = enumCollectionNames.Employes;
        }

        return collectionName;
    }
}