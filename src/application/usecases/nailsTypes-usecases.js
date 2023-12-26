
module.exports = class NailsTypesUseCases {
    constructor(prismaRepository){
        this.prismaRepository = prismaRepository;
    }
    
    findNailsTpById = async(nailsTpId){
        const [findNailsTp,err] = await this.prismaRepository.findNailsTpById(nailsTpId);
        if(err)return [null,404,err];
        return [findNailsTp,200,null];
    };

    
};