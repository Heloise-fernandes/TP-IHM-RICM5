import java.awt.Point;
import java.util.ArrayList;

public class Line {
	
	private Point endPoint;
	private Point startPoint;
	
	private ArrayList<Point> mediumPoint;
	
	private int root;
	private int leaf;
	
	private double currentAngle;
	private double FirstAngle;
	
	public Line() {
		this.mediumPoint = new ArrayList<>();
		this.leaf = -1;
		this.root = -1;
	}
	
	public Point getEndPoint() {
		return endPoint;
	}
	
	public void setEndPoint(Point endPoint) {
		this.endPoint = endPoint;
	}
	
	public Point getStartPoint() {
		return startPoint;
	}
	
	public void setStartPoint(Point startPoint) {
		this.startPoint = startPoint;
	}
	
	public ArrayList<Point> getMediumPoint() {
		return mediumPoint;
	}
	
	public void addMediumPoint(Point mediumPoint) {
		this.mediumPoint.add(mediumPoint);
	}
	
	public Point getLastPoint() {
		
		if(this.mediumPoint.size()==0)
		{
			return startPoint;
		}
		
		return this.mediumPoint.get(this.mediumPoint.size()-1);
		
	}

	public Double calculAngleBetweenPoint(Point p1, Point p2)
	{
		Double deltaY = p2.getY() - p1.getY();
		Double deltaX = p2.getX() - p1.getX();
		Double angRad = Math.atan2(deltaY, deltaX);
		if(angRad<0)
		{
			angRad = Math.abs(angRad);
		}
		else {
			angRad = 2*Math.PI-angRad;
		}
		return Math.toDegrees(angRad);
	}
	
	//calcul l'orientation d'origine
	public void calculFirstCurrentAngle(Point p2)
	{
		
		Double angle = calculAngleBetweenPoint(this.startPoint, p2);
		
		if(angle<45 || angle> 315 ) 
		{
			this.currentAngle = 0;
			this.root = 4;
		}
		else if(angle>=45 && angle< 135 ) 
		{
			this.currentAngle = 90;
			this.root = 2;
		}
		else if(angle>=135 && angle< 225 ) 
		{
			this.currentAngle = 180;
			this.root = 1;
		}
		else 
		{
			this.currentAngle = 270;
			this.root = 3;
		}
		
		this.FirstAngle = this.currentAngle;

		System.out.println(this.FirstAngle);
		
	}
	
	//observe un changement de direction
	public void calculNextCurrentAngle(Point p2)
	{
		Double angle = calculAngleBetweenPoint(this.getLastPoint(), p2);
		
		if((angle<45 || angle> 315 ) &&(this.currentAngle!=0))
		{
			System.out.println("Changement direction "+this.currentAngle+"->0");
			this.currentAngle = 0;
			this.leaf = 4;
		}
		else if((angle>=45 && angle< 135 )&&(this.currentAngle!=90))
		{
			System.out.println("Changement direction "+this.currentAngle+"->90");
			this.currentAngle = 90;
			this.leaf = 2;
		}
		else if((angle>=135 && angle< 225 )&&(this.currentAngle!=180))
		{
			System.out.println("Changement direction "+this.currentAngle+"->180");
			this.currentAngle = 180;
			this.leaf = 1;
		}
		else if ((angle>=225 && angle<= 315 )&&(this.currentAngle!=270))
		{
			System.out.println("Changement direction "+this.currentAngle+"->270");
			this.currentAngle = 270;
			this.leaf = 3;
		}
	}
	
	public void calculFinalAngle()
	{
		if(this.leaf==-1)
		{
			this.leaf = this.root;
		}
	}
	
	public int getChoice()
	{
		return this.root*10+this.leaf;
	}

	
	
	
}
