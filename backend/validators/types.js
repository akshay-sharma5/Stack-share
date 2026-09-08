import {z} from 'zod'

const format=z.object({
    "email":z.string().email().min(5).max(30),
    "password":z.string().min(6).max(30),
    "name":z.string().min(3).max(30)
})

const formatsignin=z.object({
    "email":z.string().email().min(5).max(30),
    "password":z.string().min(6).max(30)
})

export function verify(data){
    const verifyFormatSuccess=format.safeParse(data)

    if(!verifyFormatSuccess.success){
        return verifyFormatSuccess.error.issues.map(issue=>issue.message)
    }
    else{
        return verifyFormatSuccess
    }
}

export function verifySignin(data){
    const verifyFormatSuccess=formatsignin.safeParse(data)

    if(!verifyFormatSuccess.success){
        return verifyFormatSuccess.error.issues.map(issue=>issue.message)
    }
    else{
        return verifyFormatSuccess
    }
}



