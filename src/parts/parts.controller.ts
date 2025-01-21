import { Controller, Get, Post, Body, Param, Query, Delete, Put, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { Response } from 'express';


@Controller('products')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Post()
  async create(@Body() createPartDto: CreatePartDto) {
    return await this.partsService.create(createPartDto);
  }

  @Get("all")
  async findAll() {
    return await this.partsService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.partsService.findOne(id);
  }

  @Post('upload')
@UseInterceptors(FileInterceptor('image', {
  storage: diskStorage({
    destination: './uploads', // Faylni saqlash joyi
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + extname(file.originalname); // Fayl nomiga noyob qo'shimcha qo'shish
      callback(null, file.fieldname + '-' + uniqueSuffix);
    },
  }),
}))
async uploadFile(@UploadedFile() file: Express.Multer.File) {
  return this.partsService.handleFileUpload(file); // Faylni servisa yuborish
}


  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePartDto: UpdatePartDto) {
    return await this.partsService.update(id, updatePartDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.partsService.remove(id);
  }

   @Get('oem/all')
   async getAllOem() {
     return await this.partsService.getAllOem();
   }
 
   @Get('oem/:oem')
   async getOemId(@Param('oem') oem: string) {
     return await this.partsService.getOemId(oem);
   }
 
   @Get('trt/:trt')
   async getTrtCode(@Param('trt') trt: string) {
     return await this.partsService.getTrtCode(trt);
   }
 
   @Get('brand/:brand')
   async getBrand(@Param('brand') brand: string) {
     return await this.partsService.getBrand(brand);
   }
 
   @Get('part/search')
   async search(
     @Query('oem') oem: any, 
     @Query('trt') trt: any, 
     @Query('brand') brand: any, 
     @Query('model') model: any
   ) {
     return await this.partsService.search(oem, trt, brand, model);
   }

   @Get('part/category/:categoryId')
  async getPartsByCategory(@Param('categoryId') categoryId: number) {
  return await this.partsService.getPartsByCategory(categoryId);
  }

  @Get('uploads/:imageName')
  async getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    // Service orqali rasmni olish
    const imagePath = this.partsService.getImagePath(imageName);

    if (imagePath) {
      return res.sendFile(imagePath);
    } else {
      return res.status(404).send('Rasm topilmadi');
    }
  }

  @Get('parts/categories')
  async getCategories() {
    return await this.partsService.getCategories();
  }

  @Get()
  async searchByName(@Query('value') name: string) {
    return await this.partsService.searchByName(name);
  }

  @Get('all/count')
  async getTotalCount() {
  return await this.partsService.getTotalCount();
}
 
}
