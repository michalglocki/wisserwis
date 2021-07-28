package pl.mglocki.wisseriws;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class GetDetailsService {
	
	public List<Details> getDetails(){
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	
		Configuration config = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Details.class);
		SessionFactory sf = config.buildSessionFactory();
		Session session = sf.openSession();
		
		Transaction tx = session.beginTransaction();
		
		List<Details> detailsList = session.createQuery("from Details details where details.menuid < 3").list();
		
		tx.commit();
		session.close();
		return detailsList; 
	}

}
