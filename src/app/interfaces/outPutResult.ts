export interface status
{
    errorCode? : string;
    success : boolean;
}

export interface outPutResult<T>
{
    data : T;
    status : status;
}
