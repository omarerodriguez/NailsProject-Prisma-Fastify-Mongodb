
module.exports = class RedisUseCases{
    constructor(redisClient,prismaRepository){
        this.redisClient = redisClient;
        this.prismaRepository = prismaRepository;
 }

    redisFindAllDetailsNails = async() =>{
        const [redisData] = await this.redisClient.get('detailsnails');
        if(redisData){
            return [JSON.parse(redisData),200,null]
        }else{
            const [detailsnails, err] = await this.prismaRepository.findAllDetailsNails();
            if (err) return [null, 404, err]
            return [detailsnails,200,null]
        }
    }

    redisFindAllDetailsNailsById = async(detailsNailsId) =>{
        const [redisData] = await this.redisClient.get(detailsNailsId);
        if(redisData){
            return [JSON.parse(redisData),200,null]
        }else{
            const [detailsnails, err] = await this.prismaRepository.findDetailsNailsById(detailsNailsId);
            if (err) return [null, 404, err]
            return [detailsnails,200,null]
        }
    }

    redisFindAllTypesNails = async() =>{
        const [redisData] = await this.redisClient.get('typesnails');
        if(redisData){
            return [JSON.parse(redisData),200,null]
        }else{
            const [typesnails, err] = await this.prismaRepository.findAllTypesNails();
            if (err) return [null, 404, err]
            return [typesnails,200,null]
        }
    }

    redisFindAllTypesNailsById = async(typesNailsId) =>{
        const [redisData] = await this.redisClient.get(typesNailsId);
        if(redisData){
            return [JSON.parse(redisData),200,null]
        }else{
            const [typesnails, err] = await this.prismaRepository.findTypesNailsById(typesNailsId);
            if (err) return [null, 404, err]
            return [typesnails,200,null]
        }
    }
}

    
