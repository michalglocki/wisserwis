package pl.mglocki.wisseriws;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class GetListOfPictures {
	
	public List<Pictures> getListOfPictures(){
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Configuration config = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Pictures.class);
		
		SessionFactory sf = config.buildSessionFactory();
		Session session = sf.openSession();
		
		Transaction tx = session.beginTransaction();
		
		List<Pictures> listOfPictures = session.createQuery("from Pictures").list();
		
		tx.commit();
		session.close();
		return listOfPictures;
	}

}
