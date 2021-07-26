package pl.mglocki.wisseriws;

import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class GetMaxIdDetailsService {
	
	public int getMaxIdOfDetails() {
		
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Configuration config = new Configuration().configure("hibernate.cfg.xml").addAnnotatedClass(Details.class); //ListedPositions.class);
		
		SessionFactory sf = config.buildSessionFactory();
		Session session = sf.openSession();
		
		Transaction tx = session.beginTransaction();
		
		Query query = session.createQuery("select max(details.id) from Details details");
		Integer maxIdValue = (Integer) query.getSingleResult();
		
		tx.commit();
		session.close();
		return maxIdValue; 
	}

}
