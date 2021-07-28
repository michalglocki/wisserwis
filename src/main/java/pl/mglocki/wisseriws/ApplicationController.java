package pl.mglocki.wisseriws;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class ApplicationController {

		
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
		return "index.html";
	}
	
	@RequestMapping("what")
	@ResponseBody
	public List<Details> getWhatDetails() {
		
		GetDetailsService details = new GetDetailsService();
		return details.getDetails(); 
	}
	
	@PostMapping("update_details")
	@ResponseStatus(HttpStatus.CREATED)
	public void updatedDetails(@RequestBody List<Details> detailsList) {
		
		Configuration config = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Details.class);
		
		SessionFactory sf = config.buildSessionFactory();
		Session session = sf.openSession();
		for (int i = 0; i < detailsList.size(); i++) {
			session.saveOrUpdate(detailsList.get(i));
		}
		
		Transaction tx = session.beginTransaction();	
		tx.commit();
	}
	
	@DeleteMapping("delete_details")
	@ResponseStatus(HttpStatus.OK)
	public void deleteDetails(@RequestBody List<Details> detailsList) {
		
		System.out.println(detailsList.get(0).getId());
		
		Configuration config = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Details.class);
		
		SessionFactory sf = config.buildSessionFactory();
		Session session = sf.openSession();
		for (int i = 0; i < detailsList.size(); i++) {
			session.delete(detailsList.get(i));
		}
		
		Transaction tx = session.beginTransaction();	
		tx.commit();
	}
	
	@RequestMapping("list")
	@ResponseBody
	public List<ListedPositions> getListedPositions() {
		
		Configuration config = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Details.class); //ListedPositions.class);
		
		SessionFactory sf = config.buildSessionFactory();
		Session session = sf.openSession();
		
		Transaction tx = session.beginTransaction();
		
		List<ListedPositions> listedPositionsList = session.createQuery("from Details details where details.belongs is not null").list();
		
		tx.commit();
		return listedPositionsList; 
	}
	
	@RequestMapping("max")
	@ResponseBody
	public int getMaxIdValue() {
		
		GetMaxIdDetailsService id = new GetMaxIdDetailsService();
		return id.getMaxIdOfDetails();
	}
	
	@RequestMapping("pictures_max")
	@ResponseBody
	public int getMaxIdValueOfPictures() {
	
		GetMaxIdOfPicturesService id = new GetMaxIdOfPicturesService();
		return id.getMaxIdValueOfPictures();
	}
	
	@RequestMapping(value = "pictures", method = RequestMethod.GET)
	@ResponseBody
	public List<Pictures> getListOfPictures(){
		
		GetListOfPictures pictures = new GetListOfPictures();
		return pictures.getListOfPictures();
	}
	
	
	@PostMapping(value = "pictures_file")
	@ResponseStatus(value = HttpStatus.OK)
	public void uploadImage(@RequestParam("inpFile") MultipartFile file) {
		System.out.println(System.getProperty("user.dir"));
		String folder = "/opt/tomcat/webapps/ROOT/img/";//"/var/lib/tomcat/webapps/ROOT/img/"; //System.getProperty("user.dir") + "/src/main/webapp/img/";
		byte[] bytes;
		try {
			bytes = file.getBytes();
			
			Path path = Paths.get(folder + file.getOriginalFilename());
			Files.write(path, bytes);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@PostMapping(value = "pictures_db")
	@ResponseStatus(value = HttpStatus.OK)
	public void imageDbActualisation(@RequestBody List<Pictures> picturesList){
		Configuration config = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Pictures.class);
		
		SessionFactory sf = config.buildSessionFactory();
		Session session = sf.openSession();
		for (int i = 0; i < picturesList.size(); i++) {
			session.saveOrUpdate(picturesList.get(i));
		}
		
		Transaction tx = session.beginTransaction();	
		tx.commit();
	}
	
	@DeleteMapping("delete_pictures")
	@ResponseStatus(HttpStatus.OK)
	public void deletePictures(@RequestBody List<Pictures> picturesToDelete) {
		
		System.out.println(picturesToDelete.get(0).getId());
		String folder = System.getProperty("user.dir") + "/src/main/webapp/img/";
				
		Configuration config = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Pictures.class);
		
		SessionFactory sf = config.buildSessionFactory();
		Session session = sf.openSession();
		System.out.println(picturesToDelete.size());
		for (int i = 0; i < picturesToDelete.size(); i++) {
			try {
				System.out.println("This file will be deleted " + folder + picturesToDelete.get(i).getPicture());
				Files.deleteIfExists(Paths.get(folder + picturesToDelete.get(i).getPicture()));
			} catch (IOException e) {
				System.out.println("File not found");
			}
			session.delete(picturesToDelete.get(i));
		}
		
		Transaction tx = session.beginTransaction();	
		tx.commit();
	}
}
